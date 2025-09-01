import { style } from "@vanilla-extract/css";

export const wrapper = style({
  position: 'fixed',  // przyklejone do viewportu
  inset: 0,           // równa się top:0;right:0;bottom:0;left:0
  width: '100%',
  height: '100dvh',   // poprawne na mobile
  overflow: 'hidden',
  backgroundColor: '#000'
});

export const canvas = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  pointerEvents: 'none' // kliknięcia trafiają w treść
});

export const overlay = style({
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(100% 100% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)'
});

export const content = style({
  position: 'fixed',
  zIndex: 10,
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});
