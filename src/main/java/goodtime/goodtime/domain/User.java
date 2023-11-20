package goodtime.goodtime.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uId;

    private String pw;

    @OneToMany(mappedBy = "user")
    private List<UTime> UTimes = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "Room_Id")
    @JsonIgnore
    private Room room;

    @Builder
    private User(Long id, String uId, String pw, Room room){
        this.id = id;
        this.uId = uId;
        this.pw = pw;
        this.room = room;
    }
}