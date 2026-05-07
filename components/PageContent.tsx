import fs from "fs";
import path from "path";

export default function PageContent({ slug }: { slug: string }) {
  const file = path.join(process.cwd(), "lib", "pages", `${slug}.html`);
  const html = fs.readFileSync(file, "utf8");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
