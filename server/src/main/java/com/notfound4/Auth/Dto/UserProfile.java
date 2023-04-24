//package com.notfound4.Auth.Dto;
//
//import com.notfound4.Member.Entity.Member;
//
//public class UserProfile {
//    private final String oauthId;
//    private final String name;
//    private final String email;
//    private final String imageUrl;
//
//    public UserProfile(String oauthId, String name, String email, String imageUrl) {
//        this.oauthId = oauthId;
//        this.name = name;
//        this.email = email;
//        this.imageUrl = imageUrl;
//    }
//
//    public Member toMember() {
//        return new Member(oauthId, name, email, imageUrl);
//    }
//
//    public String getOauthId() {
//        return oauthId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//}
