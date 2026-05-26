export type Brand = {
  name: string
  /** File base name (no extension). Upload to public/images/brands/ — e.g. siemens.png */
  logo: string
  url?: string
}

export const driverProgramsHeading =
  'I design and optimize driver programs for these brands to enable industrial automation and integration.'

/**
 * Brands you have built driver programs for.
 * Add an entry per brand, then upload matching logos to public/images/brands/
 */
export const driverProgramBrands: Brand[] = [
  { name: 'Siemens', logo: 'siemens' },
  { name: 'Sungrow', logo: 'sungrow' },
  { name: 'Delta', logo: 'delta' },
  { name: 'Alia', logo: 'alia' },
  { name: 'Yokogawa', logo: 'yokogawa' },
]
