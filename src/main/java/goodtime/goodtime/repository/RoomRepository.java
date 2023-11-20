package goodtime.goodtime.repository;

import goodtime.goodtime.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;


import java.util.List;
import java.util.Optional;

import goodtime.goodtime.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByTitle(String title);

//    List<User> findAllUserById(Long id);


}
