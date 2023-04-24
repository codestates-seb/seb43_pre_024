package com.notfound4.Tag.Entity;

import com.notfound4.Question.Entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contagId;

    @ManyToOne
    @JoinColumn(name = "questionId")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "tagId")
    private Tag tag;
}
