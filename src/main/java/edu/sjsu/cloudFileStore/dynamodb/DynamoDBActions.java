package edu.sjsu.cloudFileStore.dynamodb;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.GetUserResult;
import com.amazonaws.services.cognitoidp.model.ListUsersRequest;
import com.amazonaws.services.cognitoidp.model.ListUsersResult;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import edu.sjsu.cloudFileStore.model.FileUploader;

public class DynamoDBActions {

	static AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion("us-east-2").build();
	static DynamoDB dynamoDB = new DynamoDB(client);

	static String fileUploader = "FileUploader";

	public static boolean InsertFiletoDB(String userName, String firstName, String lastName, String fileName,
			int fileID) throws Exception {
		try {

			Table Loadtable = dynamoDB.getTable(fileUploader);

			Item item = new Item().withPrimaryKey("FileID", fileID).withString("FirstName", firstName)
					.withString("LastName", lastName).withString("FileName", fileName).withString("UserName", userName);
			Loadtable.putItem(item);

			return true;
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return false;
		}
	}
	/*
	 * * Added to query DB for fetching userspecific files
	 */

	public static List<FileUploader> fetchFilenamesofUser(String username) {

		List<FileUploader> ListofFiles = new ArrayList<>();
		Gson gson = new GsonBuilder().create();
		try {
			ScanSpec querySpec = new ScanSpec().withFilterExpression("UserName = :UserName")
					.withValueMap(new ValueMap().withString(":UserName", username));

			ItemCollection<ScanOutcome> items = dynamoDB.getTable(fileUploader).scan(querySpec);

			Iterator<Item> iterator = items.iterator();

			while (iterator.hasNext()) {
				Item item = iterator.next();
				FileUploader singleFile = gson.fromJson(item.toJSON(), FileUploader.class);
				ListofFiles.add(singleFile);
			}
			return ListofFiles;

		} catch (Exception e) {
			System.err.println(e.getMessage());
			return null;
		}

	}

	public static List<AttributeType> fetchUserDetails(String username, String accessKey, String secretKey,
			String userPoolId) {
		BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(accessKey, secretKey);

		AWSCognitoIdentityProvider cognitoIdentityProvider = AWSCognitoIdentityProviderClientBuilder.standard()
				.withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials)).withRegion("us-east-2").build();

		ListUsersRequest listUsersRequest = new ListUsersRequest();
		ListUsersResult listusers = new ListUsersResult();

		GetUserResult getUserdetails = new GetUserResult();
		String FilterforUsername = "username=\"" + username + "\"";

		ArrayList<String> AttributeList = new ArrayList<>();

		AttributeList.add("email");
		AttributeList.add("custom:fname");
		AttributeList.add("custom:lname");

		listUsersRequest.setAttributesToGet(AttributeList);
		listUsersRequest.setFilter(FilterforUsername);
		listUsersRequest.setLimit(10);
		listUsersRequest.setUserPoolId(userPoolId);

		listusers = cognitoIdentityProvider.listUsers(listUsersRequest);

		List<AttributeType> UserListAttributes = listusers.getUsers().get(0).getAttributes();
		return UserListAttributes;
	}

}
