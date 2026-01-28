$p = 'src/data/articles.js'
$c = Get-Content $p
$fixed = 0
for ($i=0; $i -lt $c.Count; $i++) {
  if ($c[$i] -match '```') {
     $line = $c[$i]
     # Remove existing backslashes before backticks
     $line = $line -replace '\\+```', '```'
     # Add correct escaping (Interleaved: \`\`\`)
     # Using single quotes for replacement string to be literal
     $line = $line -replace '```', '\\\`\\\`\\\`'
     $c[$i] = $line
     $fixed++
  }
}
$c | Set-Content $p -Encoding UTF8
Write-Host "Fixed $fixed lines with code blocks."
