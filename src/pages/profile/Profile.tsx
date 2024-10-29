import { useEffect } from 'react';
import EditProfileForm from './EditProfileForm';
import FormCard from '../../components/FormCard';

function Profile() {
  useEffect(() => {
    document.title = 'Profile | Rent Or Sell';
  }, []);

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="flex items-start justify-center">
          <FormCard>
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Profile</h1>
            <EditProfileForm />
          </FormCard>
        </div>
      </section>
    </main>
  );
}

export default Profile;
