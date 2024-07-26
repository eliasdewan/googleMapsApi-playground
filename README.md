# Learning project - Using google maps api, implemented some practical actions that could be used in real use cases
> Follow this link for live preview: [https://big.eliatheone.uk/](https://googlemaps-api.pages.dev/) - API key is disabled , limited functionlaity. Check previews below for demonstration
 >> Find the gifs at the bottom for preview when it is paired with a working API key

HTML with javascript and Google Maps API
- [Button 1: auto start just click button 1](#action-1-and-2)
- [Button 2: works after in antipode](#action-1-and-2)
- [Button 3: click the map for the first marker](#action-3)
- [Button 4: Click the map where to have the centre of the square](#action-4)
- [Button 5: Start clicking on the map as points of a polygon](#action-5)
- [Button 6: The button toggles the overlay](#action-6)
- [Button 7: Starts at London, click two points on the map to start](#action-7)

Google API did free tier did expire so many functions font work

## Action 1 and 2
### Random location, place 4 markers at the side and a green marker in the middle, click any side marker to mark the middle of the green marker and the clicked side marker 
### Clicking the green marker 4 markers are placed on the antipode (another side of the world) and enable button 2, clicking that button enables the area that highlights when hovered over.
![First action](/examples/maps_1.gif "First action")
## Action 3
### Clicking on the map, two markers are placed 200km away from each other, and a circle is created in the middle of the two points with a diameter of 200km, clicking the circle, 10 random coloured circles appear on a perimeter of the of the circle.
![Second action](/examples/maps_2.gif "Second action")
## Action 4
### 300km square with a marked area in the middle 4 random markers inside the square and 4 markers at each corner of the square. Geo-location information window for all markers as on click action.
![Third action](/examples/maps_3.gif "Third action")
## Action 5
### On each click create an area to shape. On hover on the area mark 100 spots inside the area, with hover out, remove the markers and show the hotspot of the markers that were there and shift colour of the area.
![Fourth action](/examples/maps_4.gif "Fourth action")
## Action 6 
### Open weather API overlay for wind
![Fifth action](/examples/maps_5.gif "Fifth action")
## Action 7 
### Place two markers to outline the best 3 turn-by-turn directions, with makers on each turn including starting and end. All markers are in random colour. 
![Sixth action](/examples/maps_6.1.gif "Sixth action")
### All markers have on-click interactive street view on the info window, the info window moves with the streetview interaction.
![Seventh action](/examples/maps_6.2.gif "Seventh action")
### Action 7 - different location
![Eighth action](/examples/maps_6.3.gif "Eigth action")
