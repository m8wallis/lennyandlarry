function AZ_resizeImageMapByViewport() {
  const AZ_img = document.getElementById("lnlstadiumwithitems2");
  const AZ_map = document.getElementById("m_lnlstadiumwithitems2");
  if (!AZ_img || !AZ_map) return;

  const AZ_areas = AZ_map.getElementsByTagName("area");

  const AZ_originalWidth = 948;
  const AZ_originalHeight = 1422;
  const AZ_viewportWidth = window.innerWidth;

  // Determine horizontal padding based on screen size
  let AZ_containerPadding = 0;
  if (AZ_viewportWidth < 768) {
    AZ_containerPadding = 30 * 2;
  } else if (AZ_viewportWidth < 1024) {
    AZ_containerPadding = 60 * 2;
  } else {
    // Full size — reset coords to original
    for (let i = 0; i < AZ_areas.length; i++) {
      const AZ_coordsAttr = AZ_areas[i].getAttribute("data-coords");
      if (!AZ_coordsAttr) continue;
      AZ_areas[i].setAttribute("coords", AZ_coordsAttr);
    }
    return;
  }

  const AZ_effectiveWidth = AZ_viewportWidth - AZ_containerPadding;
  const AZ_scaleRatio = AZ_effectiveWidth / AZ_originalWidth;
  const AZ_scaleY = AZ_img.clientHeight / AZ_originalHeight;

  for (let i = 0; i < AZ_areas.length; i++) {
    const AZ_coordsAttr = AZ_areas[i].getAttribute("data-coords");
    if (!AZ_coordsAttr) continue;
    const AZ_coords = AZ_coordsAttr.split(",");
    const AZ_scaledCoords = AZ_coords.map((val, index) =>
      Math.round(parseInt(val) * (index % 2 === 0 ? AZ_scaleRatio : AZ_scaleY))
    );
    AZ_areas[i].setAttribute("coords", AZ_scaledCoords.join(","));
  }
}

// Run on DOM load and window resize
document.addEventListener("DOMContentLoaded", AZ_resizeImageMapByViewport);
window.addEventListener("resize", AZ_resizeImageMapByViewport);