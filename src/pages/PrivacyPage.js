import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const PrivacyPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 헤더 */}
      <header className="w-full p-4 flex items-center border-b border-gray-200">
        <button
          onClick={handleBack}
          className="mr-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">개인정보 처리방침</h1>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-grow w-full p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto text-gray-800">
          <h2 className="text-lg font-semibold mb-4">
            UNIPIC 개인정보처리방침
          </h2>

          <section className="mb-8">
            <h3 className="text-md font-semibold mb-2">
              제1조 (개인정보의 처리 목적)
            </h3>
            <p className="mb-2">
              UNIPIC('유니픽')은 다음의 목적을 위하여 개인정보를 처리하고
              있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인
                식별·인증, 회원자격 유지·관리, 물품 또는 서비스 공급에 따른 금액
                결제, 물품 또는 서비스의 공급·배송 등
              </li>
              <li>
                얼굴 데이터 처리: AI 사진 생성을 위해 사용자가 제공한 얼굴
                사진과 성별을 분석 및 처리하여 AI 이미지를 생성하고 사용자에게
                제공합니다.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-md font-semibold mb-2">
              제2조 (개인정보의 처리 및 보유 기간)
            </h3>
            <p className="mb-2">
              ① UNIPIC은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보
              보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서
              개인정보를 처리·보유합니다.
            </p>
            <p className="mb-2">
              ② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                고객 가입 및 관리: 서비스 이용계약 또는 회원가입 해지 시까지,
                다만 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지
              </li>
              <li>
                전자상거래에서의 계약·청약철회, 대금결제, 재화 등 공급기록: 5년
              </li>
              <li>
                얼굴 데이터: 사용자가 제공한 얼굴 사진과 성별은 AI 사진 생성
                요청 시 AWS S3 서버에 임시로 저장되며, AI 결과물이 생성된 직후
                해당 얼굴 사진은 즉시 삭제됩니다. UNIPIC은 사용자의 얼굴
                데이터를 따로 저장하지 않으며, 얼굴 데이터는 오직 AI 이미지 생성
                과정에서만 사용됩니다.
              </li>
            </ul>
          </section>

          {/* 추가적인 섹션들 */}
          <section className="mb-8">
            <h3 className="text-md font-semibold mb-2">
              제3조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)
            </h3>
            <p className="mb-2">
              정보주체는 UNIPIC에 대해 언제든지 다음 각 호의 개인정보 보호 관련
              권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
          </section>

          {/* 필요한 만큼 섹션을 계속 추가합니다 */}
          {/* 제4조부터 제12조까지 동일한 패턴으로 작성 */}

          {/* 예시로 제4조 추가 */}
          <section className="mb-8">
            <h3 className="text-md font-semibold mb-2">
              제4조 (처리하는 개인정보의 항목 작성)
            </h3>
            <p className="mb-2">
              ① UNIPIC은 다음의 개인정보 항목을 처리하고 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                필수항목: 이메일, 비밀번호, 서비스 이용 기록, 접속 로그, 쿠키,
                접속 IP 정보
              </li>
              <li>선택항목: 이름, 생년월일, 성별</li>
              <li>얼굴 데이터: 사용자가 제공한 얼굴 사진 및 성별</li>
            </ul>
          </section>

          {/* 나머지 조항들도 동일하게 추가 */}

          {/* 마지막 업데이트 날짜 또는 추가 정보 */}
          <p className="text-sm text-gray-500 mt-8">
            본 개인정보 처리방침은 2023년 8월 23일부터 적용됩니다.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
