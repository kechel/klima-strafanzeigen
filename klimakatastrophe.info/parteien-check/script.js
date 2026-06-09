document.addEventListener('DOMContentLoaded', () => 
{
  initSmoothScroll()
  initTableOfContents()
  initDiscrepancyBars()
})

function initSmoothScroll() 
{
  document.querySelectorAll('a[href^="#"]').forEach(anchor => 
  {
    anchor.addEventListener('click', function (e) 
    {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) 
      {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}

function initTableOfContents() 
{
  window.addEventListener('scroll', () => 
  {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.toc a')
    
    let current = ''
    sections.forEach(section => 
    {
      const sectionTop = section.offsetTop
      if (window.pageYOffset >= sectionTop - 100) 
      {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach(link => 
    {
      link.style.color = ''
      link.style.fontWeight = ''
      if (link.getAttribute('href') === '#' + current) 
      {
        link.style.color = 'var(--color-primary)'
        link.style.fontWeight = '600'
      }
    })
  })
}

function initDiscrepancyBars() 
{
  const observer = new IntersectionObserver((entries) => 
  {
    entries.forEach(entry => 
    {
      if (entry.isIntersecting) 
      {
        const fill = entry.target
        const width = fill.getAttribute('data-width')
        setTimeout(() => 
        {
          fill.style.width = width
        }, 100)
      }
    })
  }, {
    threshold: 0.5
  })

  document.querySelectorAll('.discrepancy-fill').forEach(fill => 
  {
    observer.observe(fill)
  })
}
