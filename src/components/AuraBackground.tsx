/**
 * Soft aurora behind the whole page: a few large, blurred blobs in the
 * portfolio's olive and moss tones that drift slowly (after auragradients.vercel.app).
 */
const AuraBackground = () => (
  <div className="aura" aria-hidden>
    <span className="aura__blob aura__blob--a" />
    <span className="aura__blob aura__blob--b" />
    <span className="aura__blob aura__blob--c" />
    <span className="aura__blob aura__blob--d" />
    <span className="aura__veil" />
  </div>
);

export default AuraBackground;
