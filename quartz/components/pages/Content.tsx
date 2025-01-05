import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { htmlToJsx } from "../../util/jsx"
import { FilePath, FullSlug, slugifyFilePath } from "../../util/path"
import { VNode } from "preact"
import { Data } from "vfile"
import { classNames } from "../../util/lang"
import styles from "../styles/navigation.scss"

interface NavigationLink {
  title: string
  slug: string
}

function getPreviousAndNextPages(allFiles: Data[], currentFile: FilePath): [NavigationLink | null, NavigationLink | null] {
  const validFiles = allFiles
    .filter(file => file.filePath!.endsWith('.md') && !file.filePath!.endsWith('index.md'))
    .sort((a, b) => a.filePath!.localeCompare(b.filePath!))

  const currentIndex = validFiles.findIndex(file => file.filePath === currentFile)

  const createNavLink = (file: Data): NavigationLink => {
    const title = file.frontmatter?.title || file.filePath!
      .split('/')
      .pop()!
      .replace('.md', '')
      .replace(/-/g, ' ')

    const cleanSlug = slugifyFilePath(file.filePath!).replace(/^content\//, '')

    return {
      title: title,
      slug: '/' + cleanSlug
    }
  }

  const prev = currentIndex > 0 ? validFiles[currentIndex - 1] : null
  const next = currentIndex < validFiles.length - 1 ? validFiles[currentIndex + 1] : null

  return [
    prev ? createNavLink(prev) : null,
    next ? createNavLink(next) : null
  ]
}

function Navigation({ prev, next, displayClass }: {
  prev: NavigationLink | null,
  next: NavigationLink | null,
  displayClass: "mobile-only" | "desktop-only" | undefined
}): VNode {
  return (
    <div class={classNames(displayClass, "navigation")} >
      <div class="navigation-previous">
        {prev && (
          <>
            <div class="navigation-title">Previous</div>
            <a href={prev.slug}>← {prev.title}</a>
          </>
        )}
      </div>
      <div class="navigation-next">
        {next && (
          <>
            <div class="navigation-title">Next</div>
            <a href={next.slug}>{next.title} →</a>
          </>
        )}
      </div>
    </div>
  )
}

const Content: QuartzComponent = ({ fileData, tree, allFiles, displayClass }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")

  const [prevPage, nextPage] = getPreviousAndNextPages(allFiles, fileData.filePath!)

  return (
    <article class={classString}>
      {content}
      <Navigation prev={prevPage} next={nextPage} displayClass={displayClass} />
    </article>
  )
}


Content.css = styles

export default (() => Content) satisfies QuartzComponentConstructor