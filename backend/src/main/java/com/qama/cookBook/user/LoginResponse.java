package com.qama.cookBook.user;

public class LoginResponse {
    private String token;
    private String email;
    private String username;

    public LoginResponse(String token, String username, String email) {
        this.token = token;
        this.email = email;
        this.username = username;
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
}
