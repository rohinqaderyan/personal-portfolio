/**
 * Audit Details - Update Category API Route
 * @description Handles GET requests to fetch test types for audit categories
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleApiError } from '@/lib/api/errorHandler';
import { GMP_VENDOR_TEST_TYPES, type UpdateCategoryResponse } from '@/types/audit';

const updateCategorySchema = z.object({
  type: z.enum(['gmp', 'gdp', 'glp', 'gcp', 'process']),
  auditCategory: z.enum(['Vendor', 'Site', 'Process']),
});

/**
 * GET handler for update category endpoint
 * Returns test types based on audit type and category
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const auditCategory = searchParams.get('auditCategory');

    // Validate query parameters
    const validatedData = updateCategorySchema.parse({
      type,
      auditCategory,
    });

    // Initialize response
    const response: UpdateCategoryResponse = {
      testType: {},
    };

    // Populate testType based on type and auditCategory
    if (validatedData.type === 'gmp' && validatedData.auditCategory === 'Vendor') {
      // Return GMP Vendor test types including ISO 9001
      response.testType = { ...GMP_VENDOR_TEST_TYPES };
    }
    // Add other combinations as needed (GDP, GLP, GCP, etc.)
    // For now, return empty testType for other combinations

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleApiError(error, '/api/auditdetails/updatecategory');
  }
}
