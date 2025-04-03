import Link from "next/link";

export default function Unauthorized() {
  return (
    <main>
      <h1>401</h1>
      <p>
        Пожалуйста, войдите в систему, чтобы получить доступ к этой странице
      </p>
      <Link href="/login">Перейти к авторизации</Link>
    </main>
  );
}
