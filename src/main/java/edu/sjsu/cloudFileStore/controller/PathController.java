package edu.sjsu.cloudFileStore.controller;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.QueryParam;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.SignUpRequest;
import com.amazonaws.services.cognitoidp.model.SignUpResult;

import edu.sjsu.cloudFileStore.dynamodb.AmazonClient;
import edu.sjsu.cloudFileStore.dynamodb.DynamoDBActions;
import edu.sjsu.cloudFileStore.model.AuthenticationHelper;
import edu.sjsu.cloudFileStore.model.FileUploader;



@Controller
//@Path("/cloudFileStore")
public class PathController {
	
	private AmazonClient amazonClient;
	
	
	/*Shishira stuff*/
	@Value("${amazonProperties.bucketName}")
	private String bucketName;

	@Value("${amazonProperties.app_client_id}")
	private String app_client_id;

	@Value("${amazonProperties.endpointUrl}")
	private String endpointUrl;

	@Value("${amazonProperties.accessKey}")
	private String accessKey;
	@Value("${amazonProperties.secretKey}")
	private String secretKey;

	@Value("${amazonProperties.user_pool_id}")
	private String user_pool_id;
	/*Shishira end*/
	
	@Autowired
    PathController(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }
	@RequestMapping(value = "/", method = RequestMethod.GET)	
	public String homepage(){
		System.out.println("Login gng on");
		return "index";
	}
	
//
//	@PostMapping("/uploadFile")
//    public boolean uploadFile(@RequestPart(value = "file") MultipartFile file,@QueryParam("username") String username) {
//        return this.amazonClient.uploadFile(username, file);
//    }
//	
	/*
	 * To insert FileInfo to DB and to upload to S3
	 */	
	@PostMapping("/insertfile")
	public ResponseEntity insertFiles(@RequestPart(value = "file") MultipartFile file, @QueryParam("username") String username)
			throws Exception {

		Boolean isDBSuccess = false;
		Boolean isS3Success = false;
		String fname = "";
		String lname = "";
		
		List<AttributeType> UserListAttributes = DynamoDBActions.fetchUserDetails(username, accessKey, secretKey, user_pool_id);

		for (AttributeType attribute : UserListAttributes) {
			if (attribute.getName().equalsIgnoreCase("custom:fname")) {
				fname = attribute.getValue();
			} else if (attribute.getName().equalsIgnoreCase("custom:lname")) {
				lname = attribute.getValue();
			}
		}

		isDBSuccess = DynamoDBActions.InsertFiletoDB(username, fname, lname,
				file.getOriginalFilename(), new Random().nextInt());
		if (isDBSuccess) {
			try {
				isS3Success = amazonClient.uploadFile(username, file);
			} catch (Exception e) {
				System.err.println(e.getMessage());
				isS3Success = false;
			}
		}
		if (isDBSuccess && isS3Success) {
			return ResponseEntity.ok().body(isDBSuccess && isS3Success);
		} else {
			return ResponseEntity.badRequest().body(null);
		}

	}
	
	@RequestMapping(value = "/filelist", method = RequestMethod.GET)
	public ResponseEntity<List<FileUploader>> FetchFileidsforUser(@QueryParam("username") String username) {
		List<FileUploader> FileIdsofUser = new ArrayList<>();
		FileIdsofUser = DynamoDBActions.fetchFilenamesofUser(username);
	//	httpResponse.setHeader("Access-Control-Allow-Origin", "*");
		
		return ResponseEntity.ok().body(FileIdsofUser);
		//return FileIdsofUser;
	}
	
	@RequestMapping(value="/adminfilelist",method = RequestMethod.GET)
	public ResponseEntity<List<FileUploader>> FetchFileidsforAdmin(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse,@QueryParam("username") String username) {
		List<FileUploader> FileIdsofUser = new ArrayList<>();
		FileIdsofUser = DynamoDBActions.fetchFilenamesforAdmin(username);
		//httpResponse.setHeader("Access-Control-Allow-Origin", "*");
		return ResponseEntity.ok().body(FileIdsofUser);
	}
	
	//check once
	@PostMapping("/downloadfile")
	public ResponseEntity<byte[]> downloadFilesforUser(@QueryParam("filename") String filename) {

		ByteArrayOutputStream file = amazonClient.fetchFilesforUser(bucketName, filename);
		return ResponseEntity.ok().contentType(AmazonClient.contentType(filename))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
				.body(file.toByteArray());
	}

	@PostMapping("/signup")
	public ResponseEntity<String> SignUpUser(@QueryParam("email") String email, @QueryParam("password") String password,
			@QueryParam("fname") String fname, @QueryParam("lname") String lname) {

		BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(accessKey, secretKey);

		AWSCognitoIdentityProvider cognitoIdentityProvider = AWSCognitoIdentityProviderClientBuilder.standard()
				.withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials)).withRegion("us-east-2").build();

		SignUpRequest signUpRequest = new SignUpRequest();
		signUpRequest.setClientId(app_client_id);
		signUpRequest.setUsername(email);
		signUpRequest.setPassword(password);
		List<AttributeType> list = new ArrayList<>();

		AttributeType attributeType = new AttributeType();
		attributeType.setName("email");
		attributeType.setValue(email);

		AttributeType attributeType1 = new AttributeType();

		attributeType1.setName("custom:fname");
		attributeType1.setValue(fname);
		
		AttributeType attributeType2 = new AttributeType();

		attributeType2.setName("custom:lname");
		attributeType2.setValue(lname);
		
		list.add(attributeType);
		list.add(attributeType1);
		list.add(attributeType2);
		
		signUpRequest.setUserAttributes(list);

		try {
			SignUpResult result = cognitoIdentityProvider.signUp(signUpRequest);
			System.out.println(result);
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.SC_EXPECTATION_FAILED).body("false");
		}
		
		return ResponseEntity.ok().body("true");
		//return "true";
	}
	
	@PostMapping("/validateuser")
	public ResponseEntity<String> ValidateUser(@QueryParam("username") String username, @QueryParam("password") String password) {
		AuthenticationHelper helper = new AuthenticationHelper(user_pool_id, app_client_id, secretKey);
		//return helper.PerformSRPAuthentication(username, password);
		
		
			Boolean authResult = helper.PerformSRPAuthentication(username, password);
			if(authResult) {
				System.out.println("Authresult true");
				return ResponseEntity.ok().body("true");
			} else {
				return ResponseEntity.status(HttpStatus.SC_EXPECTATION_FAILED).body("false");
			}
			
				
		
			
	}
	
	/*@RequestMapping(value = "/uploadFile", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public ResponseEntity<UserFilesDTO> uploadFile(
			@RequestParam(value = "file", required = true) MultipartFile file,
			@RequestParam(value = "fileName", required = true) String fileName,
			@RequestParam(value = "description", required = false) String description,
			@RequestParam(value = "userName", required = true) String userName) {

		ResponseEntity<CustomerFilesDTO> responseEntity = null;
		try {
			CustomerFilesDTO response = fileService.uploadFile(file, fileName, description, userName);
			responseEntity = new ResponseEntity<CustomerFilesDTO>(response, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<UserFilesDTO>(new UserFilesDTO(),
					HttpStatus.EXPECTATION_FAILED);
		}
		return responseEntity;
	}*/
}
