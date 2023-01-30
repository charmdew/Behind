package com.reboot.behind.data.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDto {
    private String id;

    private String password;

    private String name;

    private String email;

    private String phoneNum;

    private boolean showPhoneNum;

    private String position;

    private String track;
    private List<String> tag;

    private String detail;

}
