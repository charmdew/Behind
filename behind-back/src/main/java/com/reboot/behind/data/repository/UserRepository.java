package com.reboot.behind.data.repository;

import ch.qos.logback.core.util.ContextUtil;
import com.reboot.behind.data.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;



//@Repository
//@RequiredArgsConstructor
public interface UserRepository extends JpaRepository<User, Integer> {
//public class UserRepository{

// EntityManager em = Persistence.createEntityManagerFactory("User").createEntityManager();

    //    public User save(User user){
//        em.persist(user);
//        return user;
//    }
//
//    public User findById(Integer id){
//        return em.find(User.class,id);
//    }
    User getUserByUserId(String userId);


    default List<User> selectJPQLById1(int x, int y) {


        String jpql = "select u from User u";
        String whereSql = " where ";
        List<String> whereCondition = new ArrayList<>();
        switch (x) {
            case 0:
                break;
            case 1:
                whereCondition.add("u.front is true");
                break;
            case 2:
                whereCondition.add("u.back is true");
                break;
            case 3:
                whereCondition.add("u.embedded is true");
                break;

        }
        if (x != 0 && y != 0) {
            whereCondition.add(" and ");
        }
        switch (y) {
            case 0:
                break;
            case 1:
                whereCondition.add("u.ai is true");
                break;
            case 2:
                whereCondition.add("u.iot is true");
                break;
            case 3:
                whereCondition.add("u.bigdata is true");
                break;
            case 4:
                whereCondition.add("u.blockchain is true");
                break;
        }
        System.out.println(whereCondition);
        jpql += whereSql;
        jpql += String.join("", whereCondition);
        System.out.println(jpql);
        //        @Query(value = jpql)
//        TypedQuery<User> query = em.createQuery(jpql, User.class);

//        System.out.println(query);
        return null;
    }



}

