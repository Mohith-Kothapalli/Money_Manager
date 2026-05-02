package in.first.moneymanager.repository;

import in.first.moneymanager.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {
    //select * from tb where profid=
    List<CategoryEntity> findByProfileId(Long categoryName);
    //select* from tb where id= and profile id
    Optional<CategoryEntity> findByIdAndProfileId(Long id, Long profileId);
    //select * from tb where type= and profileid=
    List<CategoryEntity> findByTypeAndProfileId(String type, Long profileId);

    Boolean existsByNameAndProfileId(String name,Long profileId);

}
