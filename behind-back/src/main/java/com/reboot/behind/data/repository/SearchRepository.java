package com.reboot.behind.data.repository;

import com.reboot.behind.data.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SearchRepository {
    @PersistenceContext
    private EntityManager em;

    public List<User> searchUser(int x, int y) {

        String jpql = "select u from User u";
        String whereSql = " where ";
        List<String> whereCondition = new ArrayList<>();
        if(x==0 && y==0){
            TypedQuery<User> query = em.createQuery(jpql, User.class);

            return query.getResultList();
        }
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
        TypedQuery<User> query = em.createQuery(jpql, User.class);

        return query.getResultList();
    }
}
