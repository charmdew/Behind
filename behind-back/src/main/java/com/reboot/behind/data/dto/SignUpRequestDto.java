package com.reboot.behind.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
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

    private boolean front;
    private boolean back;
    private boolean embedded;

    private List<String> tag ;

    private String phoneNum;

    private boolean showPhoneNum;

    private boolean ai;

    private boolean iot;

    private boolean blockChain;

    private boolean bigData;

    private String detail;

}
