package goodtime.goodtime.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uStartTime;

    private String uEndTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


    @Override
    public String toString() {
        return "uStartTime=" + uStartTime + ", uEndTime=" + uEndTime + "}";
    }

    @Builder
    private UTime(Long id, String uStartTime, String uEndTime, User user){
        this.id = id;
        this.uStartTime = uStartTime;
        this.user = user;
        this.uEndTime = uEndTime;
        
    }
}
