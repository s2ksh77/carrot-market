import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>(typeof window === 'undefined' ? null :'/api/users/me');
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
