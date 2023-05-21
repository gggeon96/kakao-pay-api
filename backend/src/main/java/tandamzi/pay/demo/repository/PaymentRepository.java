package tandamzi.pay.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tandamzi.pay.demo.domain.Payment;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByPartnerOrderId(String uuid);

    Optional<Payment> findByTid(String tid);
}
