package com.example.na_server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name =  "ingredients")
public class Ingredient {

    //Data Members
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "name")
    private String name;
    @Column(name = "quantity")
    private float quantity;
    @Column(name = "unit_gauge")
    private String unit_gauge;   
    @Column(name = "nacontent")
    private float nacontent;

    //Constructors
    public Ingredient () {}
    public Ingredient (String name, float quantity, String unit_gauge, float nacontent) {
        this.name = name;
        this.quantity = quantity;
        this.unit_gauge = unit_gauge;
        this.nacontent = nacontent;
    }

    //Getters
    public long getId(){return id;}
    public String getName(){return name;}
    public float getQuantity(){return quantity;}
    public String getUnit_Gauge(){return unit_gauge;}
    public float getNaContent(){return nacontent;}

    //Setters
    public void setId(long id){this.id=id;}
    public void setName(String name){this.name=name;}
    public void setQuantity(float quantity){this.quantity=quantity;}
    public void setUnit_Gauge(String unit_gauge){this.unit_gauge=unit_gauge;}
    public void setNaContent(float nacontent){this.nacontent=nacontent;}
}
