package tandamzi.pay.demo.dto.request;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class KakaoPayRequestDto {
    //orderId, memberId, itemName, quantity, price
    private String orderId;
    private Long memberId;
    private String itemName;
    private int quantity;
    private int price;

    public int getTotalAmount() {
        return quantity * price;
    }

    public int getVatAmount() {
        return (int) (getTotalAmount() / 11);
    }


}
