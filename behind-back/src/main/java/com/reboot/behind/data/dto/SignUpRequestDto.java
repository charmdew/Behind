package com.reboot.behind.data.dto;

import lombok.*;

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

    private boolean isVisible;

    private int position1;

    private int position2;

    private int track1;

    private int track2;

    private String tag;

    private String detail;

}
