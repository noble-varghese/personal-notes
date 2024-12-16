#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: $0 -t <type> -n 'Your Blog Post Title'"
    echo "  -t: Type of content (post/note/project)"
    echo "  -n: Title of the content"
    exit 1
}

# Parse command line arguments
while getopts "t:n:" opt; do
    case $opt in
        t) content_type=$OPTARG ;;
        n) title=$OPTARG ;;
        ?) usage ;;
    esac
done

# Validate inputs
if [ -z "$content_type" ] || [ -z "$title" ]; then
    echo "Error: Both type and title are required"
    usage
fi

# Validate content type
case $content_type in
    post|note|project) 
        content_dir="content/${content_type}s"
        ;;
    *)
        echo "Error: Invalid content type. Must be 'post', 'project' or 'note'"
        usage
        ;;
esac

# Create content directory if it doesn't exist
mkdir -p "$content_dir"

# Get the current date in YYYY-MM-DD format
current_date=$(date +%Y-%m-%d)

# Convert the title to lowercase and replace spaces with hyphens
# Also remove special characters and multiple hyphens
formatted_title=$(echo "$title" | tr '[:upper:]' '[:lower:]' | \
    sed 's/[^a-zA-Z0-9 -]//g' | \
    tr -s ' ' '-' | \
    sed 's/^-\|-$//g')

# Create filename with date prefix
filename="${content_dir}/${current_date}-${formatted_title}.md"

# Generate meaningful tags based on the title words
# Convert to lowercase, remove special chars, and take unique words as tags
tags=$(echo "$title" | tr '[:upper:]' '[:lower:]' | \
    sed 's/[^a-zA-Z0-9 ]/ /g' | \
    tr ' ' '\n' | \
    grep -v '^$' | \
    sort -u | \
    tr '\n' ' ' | \
    sed 's/ /, /g' | \
    sed 's/, $//')

# Create the file with frontmatter
cat > "$filename" << EOF
---
date: ${current_date}
title: "${title}"
tags: [${tags}]
socialDescription: ""
socialImage: ""
---

EOF

echo "Created ${content_type}: $filename"