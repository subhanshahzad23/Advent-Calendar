import { AdventExperience } from '@/components/AdventExperience';

/**
 * The whole campaign is one immersive screen: intro, piazza, daily chapters.
 * All state lives on the client (localStorage), so this page stays a thin shell.
 */
export default function Page() {
  return (
    <main>
      <h1 className="srOnly">The Light of the Piazza — an Advent journey in 24 days</h1>
      <AdventExperience />
    </main>
  );
}
