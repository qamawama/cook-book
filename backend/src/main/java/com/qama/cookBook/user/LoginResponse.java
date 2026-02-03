package com.qama.cookBook.user;

public class LoginResponse {
    private String token;
    private String email;
    private String username;
    private Long userId;

    public LoginResponse(String token, String username, String email, Long userId) {
        this.token = token;
        this.email = email;
        this.username = username;
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
