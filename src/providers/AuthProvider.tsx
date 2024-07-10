import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useContext } from 'react';
import { PropsWithChildren } from 'react';

type AuthData = {
    session: Session | null,
    profile: any,
    loading: boolean,
    isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
    isAdmin: false
});

export default function AuthProvider({children }: PropsWithChildren<{}>) {
    const [session, setSession] = useState<Session | null>(null);
    const [ loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);


    useEffect(() => {
        const fetchSession = async () => {
            const {data } = await supabase.auth.getSession();
            console.log(data.session);
            setLoading(false);

            if (session) {
                const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                setSession(data.session);
                setProfile(data || null);
            }
            setLoading(false);
        };
      
         fetchSession();
        
    }, []);

    return <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group === 'ADMIN'}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
}