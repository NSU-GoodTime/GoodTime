package goodtime.goodtime.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private User(Long id, String uId, String pw){

        this.id = id;
        this.uId = uId;
        this.pw = pw;
    }
}