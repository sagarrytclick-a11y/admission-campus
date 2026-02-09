import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';

// Valid status values
const VALID_STATUSES = ['pending', 'contacted', 'resolved', 'closed'];

export async function GET() {
  try {
    console.log('🚀 [API] GET /api/admin/enquiries - Request received');
    
    console.log('🔗 [API] Connecting to database...');
    await connectDB();
    console.log('✅ [API] Database connected successfully');
    
    console.log('📋 [API] Fetching all enquiries...');
    const enquiries = await Enquiry.find({ is_active: true })
      .sort({ created_at: -1 }) // Sort by newest first
      .lean(); // Use lean() for better performance
    
    console.log(`✅ [API] Enquiries fetched: ${enquiries.length} enquiries found`);
    
    // Transform the data to match the frontend interface
    const transformedEnquiries = enquiries.map(enquiry => ({
      _id: enquiry._id,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      subject: enquiry.subject,
      message: enquiry.message,
      status: enquiry.status,
      priority: enquiry.priority,
      source: enquiry.source,
      assignedTo: enquiry.assignedTo,
      createdAt: enquiry.created_at,
      updatedAt: enquiry.updated_at
    }));
    
    return NextResponse.json({
      success: true,
      message: "Enquiries fetched successfully",
      data: transformedEnquiries,
    });
    
  } catch (error) {
    console.error('❌ [API] Error fetching enquiries:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch enquiries',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Enquiry ID is required' },
        { status: 400 }
      );
    }
    
    console.log(`🗑️ [API] DELETE /api/admin/enquiries - Deleting enquiry: ${id}`);
    
    await connectDB();
    
    // Soft delete by setting is_active to false
    const enquiry = await Enquiry.findByIdAndUpdate(
      id, 
      { is_active: false },
      { new: true }
    );
    
    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    console.log(`✅ [API] Enquiry deleted successfully: ${id}`);
    
    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully"
    });
    
  } catch (error) {
    console.error('❌ [API] Error deleting enquiry:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete enquiry',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update enquiry status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, priority, assignedTo, notes } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Enquiry ID is required' },
        { status: 400 }
      );
    }
    
    // Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }
    
    console.log(`✏️ [API] PUT /api/admin/enquiries - Updating enquiry: ${id}`);
    
    await connectDB();
    
    // Build update object with only provided fields
    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (notes) updateData.notes = notes;
    
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    console.log(`✅ [API] Enquiry updated successfully: ${id}`);
    
    return NextResponse.json({
      success: true,
      message: "Enquiry updated successfully",
      data: {
        _id: enquiry._id,
        status: enquiry.status,
        priority: enquiry.priority,
        assignedTo: enquiry.assignedTo,
        updatedAt: enquiry.updated_at
      }
    });
    
  } catch (error) {
    console.error('❌ [API] Error updating enquiry:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update enquiry',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
