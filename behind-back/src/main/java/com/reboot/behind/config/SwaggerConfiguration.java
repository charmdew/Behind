package com.reboot.behind.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.reboot.behind"))
                .paths(PathSelectors.any())
                .buils();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Behind RestApi")
                .description("Behind 서비스의 rest api 사용법에 대하여 설명합니다.")
                .version("1.0.0")
                .build();
    }
}
