package goodtime.goodtime.repository;

import goodtime.goodtime.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
