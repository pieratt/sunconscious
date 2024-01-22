import { IWisdom } from "@/lib/types";
import { Text } from "@/ui/common/Typography";
import Link from "next/link";

function Avatar() {
  return <div className="h-8 w-8 bg-stone-400 rounded-full"></div>;
}

interface Props extends IWisdom {}

function Source(props: IWisdom["attribution"]["source"]) {
  if (!props.url) {
    return (
      <Text className="text-neon hover:text-neon uppercase">{props.name}</Text>
    );
  }
  return (
    <Link href={props.url} target="_blank">
      <Text className="text-neon hover:text-neon uppercase">{props.name}</Text>
    </Link>
  );
}

function Attribution(props: IWisdom["attribution"]) {
  return (
    <div className="flex flex-col items-start">
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

export default function WisdomItem(props: Props) {
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
