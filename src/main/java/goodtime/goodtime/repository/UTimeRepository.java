package goodtime.goodtime.repository;

import goodtime.goodtime.domain.UTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface UTimeRepository extends JpaRepository<UTime, Long> {
    List<UTime> findByUser_uId(Long uId);


}
