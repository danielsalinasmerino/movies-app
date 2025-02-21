import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  return navigate;
};
