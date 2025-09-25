export const getSelectedSlidesText = async () => {
  return PowerPoint.run(async context => {
    try {
      // Get the selected slides
      const selectedSlides = context.presentation.getSelectedSlides()

      // Load the slides collection
      selectedSlides.load('items')
      await context.sync()

      // Check if any slides are selected
      if (!selectedSlides.items || selectedSlides.items.length === 0) {
        return ''
      }

      let allText = ''

      // Iterate through each selected slide
      for (const slide of selectedSlides.items) {
        try {
          // Get all shapes on the slide
          const shapes = slide.shapes
          shapes.load('items')
          await context.sync()

          // Check if shapes exist
          if (shapes.items && shapes.items.length > 0) {
            // Iterate through each shape to extract text
            for (const shape of shapes.items) {
              try {
                // Try to get text from the shape
                if (shape.textFrame) {
                  shape.textFrame.textRange.load('text')
                  await context.sync()

                  if (shape.textFrame.textRange.text) {
                    allText += shape.textFrame.textRange.text + '\n'
                  }
                }
              } catch (shapeError) {
                // Skip this shape if there's an error (like no text frame)
                console.warn('Error in getting shapeText', shapeError)
              }
            }
          }
        } catch (slideError) {
          // Skip this slide if there's an error
          console.warn('Error in getting slideText', slideError)
        }
      }

      return allText.trim()
    } catch (error) {
      console.error('Error getting selected slides text:', error)
      return ''
    }
  })
}
