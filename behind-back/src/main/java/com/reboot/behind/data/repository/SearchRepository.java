package com.reboot.behind.data.repository;

import com.reboot.behind.data.entity.User;
import org.springframework.data.domain.Page;
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


    public List<User> searchUser(int x, int y,int z,int w) {

        String jpql = "select u from User u";
        String whereSql = " where u.userId != 'deletedUser' and ";
        List<String> whereCondition = new ArrayList<>();
        if(x==0 && y==0){
            jpql+= " where u.userId != 'deletedUser'";
            jpql += " order by u.id desc";
            System.out.println(jpql);
            System.out.println(z);
            System.out.println(z+w);
            TypedQuery<User> query = em.createQuery(jpql, User.class);

            return query.setFirstResult(z).setMaxResults(w).getResultList();
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
                whereCondition.add("u.major is true");
                break;
            case 2:
                whereCondition.add("u.nonMajor is true");
                break;
        }
        System.out.println(whereCondition);
        jpql += whereSql;
        jpql += String.join("", whereCondition);
        jpql += " order by u.id desc";
        System.out.println(jpql);
        TypedQuery<User> query = em.createQuery(jpql, User.class);

        return query.setFirstResult(z).setMaxResults(w).getResultList();
    }
}
