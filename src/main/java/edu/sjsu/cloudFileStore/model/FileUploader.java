package edu.sjsu.cloudFileStore.model;

public class FileUploader {

	private String FileID;
	private String FileName;
	private String FirstName;
	private String LastName;
	private String UserName;
	private String FileUploadTime;
	private String FileUpdatedTime;
	
	public String getFileID() {
		return FileID;
	}
	public void setFileID(String fileID) {
		FileID = fileID;
	}
	public String getFileName() {
		return FileName;
	}
	public void setFileName(String fileName) {
		FileName = fileName;
	}
	public String getFirstName() {
		return FirstName;
	}
	public void setFirstName(String firstName) {
		FirstName = firstName;
	}
	public String getLastName() {
		return LastName;
	}
	public void setLastName(String lastName) {
		LastName = lastName;
	}
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
	}
	public String getFileUploadTime() {
		return FileUploadTime;
	}
	public void setFileUploadTime(String fileUploadTime) {
		FileUploadTime = fileUploadTime;
	}
	public String getFileUpdatedTime() {
		return FileUpdatedTime;
	}
	public void setFileUpdatedTime(String fileUpdatedTime) {
		FileUpdatedTime = fileUpdatedTime;
	}

}
