/**
 * Audit Types and Interfaces
 * @description Type definitions for audit management system
 */

/**
 * Audit Type Options
 */
export type AuditType = 'gmp' | 'gdp' | 'glp' | 'gcp' | 'process';

/**
 * Audit Category Options
 */
export type AuditCategory = 'Vendor' | 'Site' | 'Process';

/**
 * GMP Vendor Audit Test Types
 */
export const GMP_VENDOR_TEST_TYPES = {
  medical_device: 'Medical Device',
  biologics: 'Biologics',
  drug_product: 'Drug Product',
  external_warehouse: 'External Warehouse',
  medical_device_and_combination_products: 'Medical Device and Combination Products',
  iso_9001: 'ISO 9001',
} as const;

export type GMPVendorTestType = keyof typeof GMP_VENDOR_TEST_TYPES;

/**
 * Test Type Response Interface
 */
export interface TestTypeResponse {
  [key: string]: string;
}

/**
 * Update Category Request Interface
 */
export interface UpdateCategoryRequest {
  type: AuditType;
  auditCategory: AuditCategory;
}

/**
 * Update Category Response Interface
 */
export interface UpdateCategoryResponse {
  testType: TestTypeResponse;
}

/**
 * Update Test Case Request Interface
 */
export interface UpdateTestCaseRequest {
  auditType?: string;
  testType?: string;
  [key: string]: unknown;
}

/**
 * Save GMP Audit Category Request Interface
 */
export interface SaveGMPAuditCategoryRequest {
  auditType?: string;
  testType?: string;
  auditCategory?: AuditCategory;
  [key: string]: unknown;
}
