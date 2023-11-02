package goodtime.goodtime.repository;

import goodtime.goodtime.domain.User;
import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<User, Long> {
}
