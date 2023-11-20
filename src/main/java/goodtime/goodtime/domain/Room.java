package goodtime.goodtime.domain;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String day;

    private int startTime;

    private int endTime;

    private int personnel;

    private String firstRank;

    private String secondRank;

    private String ThirdRank;

    @OneToMany(mappedBy = "room")
    private List<User> users = new ArrayList<>();
    @Builder
    public Room(Long id, String  title, String day, int startTime, int endTime, int personnel, String firstRank, String secondRank, String ThirdRank){
        this.id = id;
        this.title = title;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.personnel = personnel;
        this.firstRank = firstRank;
        this.secondRank = secondRank;
        this.ThirdRank = ThirdRank;
    }
}
