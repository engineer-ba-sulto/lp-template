import SocialShareButtons from "./SocialShareButtons";

export default function ThankYouMessage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">ご登録ありがとうございます！</h1>
      <p className="mt-4 text-lg">待機リストへの登録が完了しました。</p>
      <div className="mt-8">
        <p className="mb-4">このサービスをシェアして応援してください！</p>
        <SocialShareButtons />
      </div>
    </div>
  );
}
