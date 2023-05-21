package tandamzi.pay.demo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import tandamzi.pay.demo.dto.response.KakaoApproveResponse;
import tandamzi.pay.demo.dto.response.KakaoCancelResponse;
import tandamzi.pay.demo.dto.response.KakaoReadyResponse;
import tandamzi.pay.demo.dto.request.KakaoPayRequestDto;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class KakaoPayService {

    @Value("${kakao-payment.cid}")
    private String cid; // 가맹점 테스트 코드
    @Value("${kakao-payment.admin-key}")
    private String admin_Key;
    @Value("${kakao-payment.approve-url}")
    private String approveUrl;
    @Value("${kakao-payment.cancel-url}")
    private String cancelUrl;
    @Value("${kakao-payment.fail-url}")
    private String failUrl;
    @Value("${kakao-payment.ready-request-url}")
    private String requestUrl;
    @Value("${kakao-payment.approve-request-url}")
    private String approveRequestUrl;


    private KakaoReadyResponse readyResponse;

    public KakaoReadyResponse requestKakaoPay(KakaoPayRequestDto kakaoPayRequestDto) {
        //cid,admin_Key,approveUrl,cancelUrl,failUrl,requestUrl,approveRequestUrl 로그찍어보기
        log.info("cid : {}", cid);
        log.info("admin_Key : {}", admin_Key);
        log.info("approveUrl : {}", approveUrl);
        log.info("cancelUrl : {}", cancelUrl);
        log.info("failUrl : {}", failUrl);
        log.info("requestUrl : {}", requestUrl);
        log.info("approveRequestUrl : {}", approveRequestUrl);
        log.info("[service] kakaoPayReady kakaoPayReady()");

        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", kakaoPayRequestDto.getOrderId());
        parameters.add("partner_user_id", kakaoPayRequestDto.getMemberId().toString());
        parameters.add("item_name", kakaoPayRequestDto.getItemName());
        parameters.add("quantity", Integer.toString(kakaoPayRequestDto.getQuantity()));
        parameters.add("total_amount", Integer.toString(kakaoPayRequestDto.getTotalAmount()));
        parameters.add("vat_amount", Integer.toString(kakaoPayRequestDto.getVatAmount()));
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", approveUrl);
        parameters.add("cancel_url", cancelUrl);
        parameters.add("fail_url", failUrl);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        RestTemplate restTemplate = new RestTemplate();
        readyResponse = restTemplate.postForObject(requestUrl, requestEntity, KakaoReadyResponse.class);

        log.info("[service] requestParameter : {}", parameters);
        log.info("[service] readyResponse : {}", readyResponse);
        return readyResponse;
    }

    /**
     * 결제 완료 승인
     */
    public KakaoApproveResponse approveResponse(String pgToken) {
        log.info("[service] KakaoApproveResponse approveResponse");

        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", readyResponse.getTid());
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", pgToken);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                approveRequestUrl,
                requestEntity,
                KakaoApproveResponse.class);

        return approveResponse;
    }

    /**
     * 카카오 API 요청 Header
     */
    private HttpHeaders getHeaders() {
        log.info("[service] HttpHeaders getHeaders");
        HttpHeaders httpHeaders = new HttpHeaders();
        String auth = "KakaoAK " + admin_Key;
        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }

    /**
     * 결제 환불
     */
    public KakaoCancelResponse kakaoCancel() {

        // 카카오페이 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", "환불할 결제 고유 번호");
        parameters.add("cancel_amount", "환불 금액");
        parameters.add("cancel_tax_free_amount", "환불 비과세 금액");
        parameters.add("cancel_vat_amount", "환불 부가세");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class);

        return cancelResponse;
    }

}