package edu.sjsu.cloudFileStore.model;

import java.sql.Timestamp;

public class FileInfo {
	
	private int id;

	
	private UserInfo user;

	private String name;
	
	
	private String description;
	
	private String path;
	
	
	private Timestamp createdTime;
	
	
	private Timestamp updatedTime;
	
	private String fileSize;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public UserInfo getUser() {
		return user;
	}

	public void setCustomer(UserInfo customer) {
		this.user = customer;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Timestamp createdTime) {
		this.createdTime = createdTime;
	}

	public Timestamp getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Timestamp updatedTime) {
		this.updatedTime = updatedTime;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String string) {
		this.fileSize = string;
	}
}
