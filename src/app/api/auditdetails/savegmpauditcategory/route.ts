/**
 * Audit Details - Save GMP Audit Category API Route
 * @description Handles PUT requests to save GMP audit category information
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleApiError, parseJsonBody } from '@/lib/api/errorHandler';
import { GMP_VENDOR_TEST_TYPES } from '@/types/audit';

// Extract valid GMP Vendor test type values
const validGMPVendorTestTypes = Object.values(GMP_VENDOR_TEST_TYPES) as string[];

const saveGMPAuditCategorySchema = z
  .object({
    auditType: z.string().optional(),
    testType: z.string().optional(),
    auditCategory: z.enum(['Vendor', 'Site', 'Process']).optional(),
    // Add other fields as needed
  })
  .passthrough(); // Allow additional fields

/**
 * PUT handler for save GMP audit category endpoint
 * Validates and accepts ISO 9001 in the auditType/testType field for GMP Vendor audits
 */
export async function PUT(request: NextRequest) {
  try {
    // Parse request body
    const body = await parseJsonBody(request);

    // Validate request body
    const validatedData = saveGMPAuditCategorySchema.parse(body);

    // Additional validation for GMP Vendor audit types
    if (validatedData.auditCategory === 'Vendor') {
      // For Vendor category, validate testType or auditType against GMP Vendor types
      const typeToValidate = validatedData.testType || validatedData.auditType;

      if (typeToValidate && !(validGMPVendorTestTypes as string[]).includes(typeToValidate)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid audit/test type for Vendor category. Must be one of: ${validGMPVendorTestTypes.join(', ')}`,
          },
          { status: 400 }
        );
      }
    }

    // In a real application, this would save to the database
    // For now, return success response
    return NextResponse.json(
      {
        success: true,
        message: 'GMP audit category saved successfully',
        data: validatedData,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, '/api/auditdetails/savegmpauditcategory');
  }
}
