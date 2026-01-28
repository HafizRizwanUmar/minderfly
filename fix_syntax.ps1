$p = 'src/data/articles.js'
$lines = @(Get-Content $p)
$lines[1716] = '\\\`\\\`\\\`bash'
$lines[1719] = '\\\`\\\`\\\`'
$lines | Set-Content $p -Encoding UTF8
Write-Host "Fixed lines 1716 and 1719 with full escaping"
