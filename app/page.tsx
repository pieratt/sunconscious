import { Wisdom } from "@/ui/bespoke/Wisdom";

const wisdom = {
  excerpt:
    "A disquieting sense of triviality, of worthlessness even, will nag the man or woman who labors in the service of a gift and whose products are not adequately described as com- modities. Where we reckon our substance by our acquisitions, the gifts of the gifted man are powerless to make him substantial.",
  attribution: {
    source: {
      name: "Intelligence as a Planetary Scale Process",
      url: "https://www.cambridge.org/core/journals/international-journal-of-astrobiology/article/intelligence-as-a-planetary-scale-process/5077C784D7FAC55F96072F7A7772C5E5",
    },
    authors: [
      {
        id: "1",
        name: "Lewis Hyde",
      },
    ],
  },
  addedBy: {
    id: "1",
    username: "username",
  },
  addedDate: new Date(),
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Wisdom {...wisdom} />
    </main>
  );
}
