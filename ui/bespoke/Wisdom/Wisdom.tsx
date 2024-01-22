import { Text } from "@/ui/common/Typography";
import Link from "next/link";

function Avatar() {
  return <div className="h-8 w-8 bg-stone-400 rounded-full"></div>;
}

interface IAttribution {
  source: {
    name: string;
    url?: string;
  };
  authors: {
    id: string;
    name: string;
  }[];
}

interface Props {
  excerpt: string;
  attribution: IAttribution;
  addedBy: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  addedDate: Date;
}

function Source(props: IAttribution["source"]) {
  if (!props.url) {
    return (
      <Text className="text-neon hover:text-neon uppercase">{props.name}</Text>
    );
  }
  return (
    <Link href={props.url}>
      <Text className="text-neon hover:text-neon uppercase">{props.name}</Text>
    </Link>
  );
}

function Attribution(props: IAttribution) {
  return (
    <div className="flex flex-col">
      <Source {...props.source} />
      <Text className="text-neon hover:text-neon uppercase">
        {props.authors.map((author) => author.name).join(", ")}
      </Text>
    </div>
  );
}

function AddedBy(props: Pick<Props, "addedBy" | "addedDate">) {
  return (
    <div className="flex gap-4 items-center">
      <Avatar />
      <Link href={`/${props.addedBy.username}`}>
        <Text className="text-stone-400">{props.addedBy.username}</Text>
      </Link>
      <Text className="text-stone-400">
        {props.addedDate.toLocaleDateString()}
      </Text>
    </div>
  );
}

export default function Wisdom(props: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="border border-stone-200 rounded p-6 gap-2 flex flex-col">
        <Text variant="serif" className="text-stone-50 text-xl">
          {props.excerpt}
        </Text>
        <Attribution {...props.attribution} />
      </div>
      <AddedBy {...props} />
    </div>
  );
}
